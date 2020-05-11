#### Vertical align row
* https://medium.com/wdstack/bootstrap-4-vertical-center-1211448a2eff
* h-100 - makes height 100%
* my-auto - vertical align
* Body needs to be 100% too (otherwise 100% of inner container)
```html
<div class="row h-100">
   <div class="col-sm-12 my-auto">
     <div class="card card-block w-25">Card</div>
   </div>
</div>
```
* requires
```scss
html, body, #root, #root>div {
   height: 100% !important;
 }
```