import { from, Observable } from "rxjs";

export function promiseTest1() {
  from(
    new Promise((r1, r2) => {
      // r2(new Error("reject"));
      r1("resolve");
    })
  ).subscribe(
    () => {
      console.log("next");
    },
    (e) => {
      console.log(e);
    },
    () => {
      console.log("complete");
    }
  );
}

export function promiseTest2() {
  from(
    new Promise((r1, r2) => {
      r2(new Error("reject"));
    })
  ).subscribe(
    () => {
      console.log("next");
    },
    (e) => {
      console.log(e);
    },
    () => {
      console.log("complete");
    }
  );
}

function subscribeToPromise(promise) {
  return function (subscriber) {
    promise.then(
      function (value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      },
      function (err) {
        return subscriber.error(err);
      }
    );

    return () => {
      console.log("unsubscribe");
    };
  };
}

// resolve, reject 호출시 unsubscribe 되는지?
// 결론
// unsubscribe는 호출이되고 subscriber의 초기화가 이루어진다.
// 그러나 subscribeToPromise이 tearDown 함수를 리턴하는 것이 아니라 subscriber를 리턴하므로 tearDown 함수가 수행되는 것이 아니고 초기화만 이루어진다.
export function promiseTest3() {
  Observable.create(
    subscribeToPromise(
      new Promise((r1, r2) => {
        r1("resolve");
      })
    )
  ).subscribe(
    () => {
      console.log("next");
    },
    (e) => {
      console.log(e);
    },
    () => {
      console.log("complete");
    }
  );
}

export function promiseTest4() {
  Observable.create(
    subscribeToPromise(
      new Promise((r1, r2) => {
        r2(new Error("reject"));
      })
    )
  ).subscribe(
    () => {
      console.log("next");
    },
    (e) => {
      console.log(e);
    },
    () => {
      console.log("complete");
    }
  );
}
