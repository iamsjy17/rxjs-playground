// import { create } from 'rxjs';


// export function test() {
//     const observable = create(function (observer: any) {
//         observer.next(1);
//         observer.next(2);
//         observer.next(3);
//         observer.complete();

//             // complete 이후는 실행되지 않는다.
//         observer.next(4);
//         observer.error(new Error('error!!'));
//         observer.complete();
//         console.log('after complete')
//     });

//     observable.subscribe(
//         (value: any) => console.log(value),
//         () => {},
//         () => console.log('complete')
//     );
// }