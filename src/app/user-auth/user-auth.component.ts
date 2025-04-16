import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { cart, login, product, signUp } from '../data-type';
import { UserService } from '../services/user.service';
import { NgIf } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-user-auth',
  imports: [FormsModule, NgIf],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css',
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authError: string = '';
  constructor(private user: UserService, private product: ProductService) {}
  ngOnInit() {
    this.user.userAuthReload();
  }
  signUp(data: signUp) {
    this.user.userSignUp(data);
  }
  login(data: login) {
    this.user.userLogin(data);
    this.user.invalidUserAuth.subscribe((result) => {
      if (result) {
        this.authError = 'User not found';
      } else {
        this.localCartToRemoteCart();
      }
    });
  }
  opensignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user).id;
    if(data){
     let cartDataList:product[]= JSON.parse(data);
   
     cartDataList.forEach((product:product, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.product.addToCart(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
 
    setTimeout(() => {
     this.product.getCartList(userId)
    }, 2000);
     
   }
}
