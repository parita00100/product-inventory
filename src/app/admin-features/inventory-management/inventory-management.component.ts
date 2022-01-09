import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MessageConstant } from 'src/app/shared/constant/message.constant';
import { PaginatorModel } from '../../shared/models/commonModel';
import { InventoryManagementService } from './inventory-management.service';
@Component({
  selector: 'app-inventory-management',
  templateUrl: './inventory-management.component.html',
  styleUrls: ['./inventory-management.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService, ConfirmationService]
})
export class InventoryManagementComponent implements OnInit {

  paginator = new PaginatorModel();
  itemForm: FormGroup | any;
  @ViewChild('dt1') dt1: Table | undefined;
  message: any = MessageConstant;
  public inventoryObj: any = {
    productList: [],
    listLoader: false,
    isAddPopupDisplay: false,
    categoryOption: [{ name: 'Electronics', value: 'Electronics' }, { name: 'Food', value: 'Food' }, { name: 'Clothing', value: 'Clothing' }],
    submitted: false

  };

  constructor(private fb: FormBuilder, private messageService: MessageService, private confirmationService: ConfirmationService,
    private inventoryService: InventoryManagementService) {
  }

  ngOnInit(): void {
    this.createItemForm();
    this.inventoryService.getProducts().then(data => this.inventoryObj.productList = data);
  }

  /* create item form */
  createItemForm() {
    this.itemForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      pricePerItem: [null, Validators.required],
      quantity: [null, Validators.required],
      totalPrice: [null, Validators.required],
      category: [null, Validators.required],
      editItemId: [null]
    })
  }

  get itemFrm() {
    return this.itemForm.controls;
  }

  /* add inventory*/
  addInventory() {
    this.inventoryObj.isAddPopupDisplay = true;
    this.inventoryObj.submitted = false;
    this.itemForm.reset();
  }

  /*save inventory*/
  saveInventory() {
    this.inventoryObj.submitted = true;
    if (this.itemForm.valid) {
      //update item
      if (this.itemFrm.editItemId.value) {
        let obj = this.inventoryObj.productList?.find((item: any) => +item.s_no == +this.itemFrm.editItemId.value);
        if (obj) {
          obj.name = this.itemFrm.name.value,
            obj.description = this.itemFrm.description.value;
          obj.price_per_item = this.itemFrm.pricePerItem.value;
          obj.quantity = this.itemFrm.quantity.value;
          obj.total_price = this.itemFrm.totalPrice.value;
          obj.category = this.itemFrm.category.value?.value;
          this.hidePopup();
          this.displayToast('success', this.message?.inventory.itemUpdateSuccess);
        } else {
          this.displayToast('error', this.message?.CommonMessage.somethingWorng);
        }
      } else {
        //save item
        let savePayload = {
          name: this.itemFrm.name.value,
          description: this.itemFrm.description.value,
          price_per_item: this.itemFrm.pricePerItem.value,
          quantity: this.itemFrm.quantity.value,
          total_price: this.itemFrm.totalPrice.value,
          category: this.itemFrm.category.value?.value,
          s_no: this.inventoryObj.productList?.length + 1,

        };
        this.inventoryObj.productList.push(savePayload);
        this.hidePopup();
        this.displayToast('success', this.message?.inventory.itemAddSuccess);

      }

    }
  }

  /*edit inventory*/
  editInventory(data: any) {
    if (data) {
      this.inventoryObj.isAddPopupDisplay = true;
      this.itemForm.reset();
      this.itemForm.patchValue({
        name: data.name,
        description: data.description,
        pricePerItem: data.price_per_item,
        quantity: data.quantity,
        totalPrice: data.total_price,
        category: { name: data.category, value: data.category },
        editItemId: data.s_no
      });
    }

  }

  /* delete item */
  deleteInventory(index: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this item?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.inventoryObj.productList.splice(index, 1);
        this.displayToast('success', this.message?.inventory.itemDeleteSuccess);
      }
    });
  }

  /* calculate total price*/
  calculateTotalPrice(quantity: any, pricePerItem: any) {
    if (quantity || pricePerItem) {
      let totalValue = Number(quantity) * +(pricePerItem);
      this.itemFrm.totalPrice.setValue(totalValue);
    }
  }

  /*display toast message*/
  displayToast(type: string, message: string) {
    setTimeout(() => {
      this.messageService.add({
        severity: type, summary: type, detail: message
      });
    }, 500);
  }

  /* hide item popup */
  hidePopup() {
    this.inventoryObj.isAddPopupDisplay = false;
    this.itemForm.reset();
    this.inventoryObj.submitted = false;
  }

  /*add global filter */
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }


}
