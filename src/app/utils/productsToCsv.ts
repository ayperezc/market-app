import { CartProduct } from "../interfaces/cart-product";
import { ProductMinified } from "../interfaces/product-minified";
import { StringKeysObject } from "../interfaces/string-keys-object";

export function productsToCsv(products: CartProduct[]){
  const productsMinified: ProductMinified[] = products.map(prod => ({
    id: prod.id,
    title: prod.title,
    price: prod.price,
    quantity: prod.quantity,
  }))

  const stringKeysObjectArray: StringKeysObject[] = []

  productsMinified.forEach(p => {
    let stringKeysObject: StringKeysObject = {};
    Object.entries(p).forEach(([k,v]) => {
      stringKeysObject[k] = v;
    })
    stringKeysObjectArray.push(stringKeysObject)
  })

  const header = Object.keys(stringKeysObjectArray[0])
  const content = [
    header.join(','),
    ...stringKeysObjectArray.map(row => header.map(fieldName => JSON.stringify(row[fieldName])).join(','))
  ].join('\r\n').replaceAll('\[','"\[').replaceAll('\]','\]\"')

  let csvFile = "data:text/csv;charset=utf-8," + content
  var encodedUri = encodeURI(csvFile);
  window.open(encodedUri);
}
