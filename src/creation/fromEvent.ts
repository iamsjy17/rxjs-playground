import { fromEvent, Subscription } from "rxjs";


export function test() {
  fromEvent(document, "click").subscribe((val) => console.log(val));
}

export function errorTest1() {
  fromEvent(document, "click").subscribe((val : any) => {
    console.log(val.noneFunction())
  });
}

export function errorTest2() {
  fromEvent(document, "click").subscribe((val: any) => {
    try {
      console.log(val.noneFunction())
    } catch(e){
      console.log(e)
    }   
  });
}

export function completeTest() {
  const sub = fromEvent(document, "click").subscribe((val) => console.log(val));

  setTimeout(()=>{sub.unsubscribe()}, 2000);
}
