# 2week

> 타입스크립트 초보자와 숙련자는 타입 구문의 수에서 차이가 난다. 숙련된 타입스크립트 개발자는 비교적 적은 수의 구문(그러나 중요한 부분에는 사용)을 사용한다. 반면, 초보자의 코드는 불필요한 타입구문으로 도배되어 있을 것이다.

## default 값을 설정했으면 굳이 타입을 지정해주지 않아도 된다.

```typescript
function Value(initialValue = false) {
  const value = initialValue;
  return value;
}

const value = Value();
```

<br />

## 보통 타입정보가 있는 라이브러리에서, 콜백 함수의 매개변수 타입은 자동으로 추론된다. 다음 예제에서 express HTTP 서버 라이브러리를 사용하는 request, response의 타입 선언은 필요하지 않다.

```typescript
// 이렇게 하지 맙시다.
app.get("/post", (request: Request, response: Respone) => {
	...
})

// 이렇게 합시다.
app.get("/post", (request, response) => {
  ...
})

```

내 예전 코드를 보면 "이렇게 하지 맙시다"를 내가 하고 있음

https://github.com/ksmfou98/cafe/blob/master/server/src/controllers/boardController.ts

<br />

## let 대신 const로 변수를 선언하면 더 좁은 타입이 된다.

```typescript
let x = "x"; // string

const y = "y"; // "y"
```

그 이유는 `let` 은 언제든 **재할당** 이 가능하기 때문에 새로운 값이 할당되면 그 값까지 미리 예측해서 타입 추론을 해줘야 하기 때문에 `string` 타입으로 지정하지만 `const` 는 한번 지정하면 다시는 재 할당이 불가능하기 때문에 좁은 타입으로 지정한다.

<br />

## const 단언문

`const` 단언문과 변수 선언에 쓰이는 `let` 이나 `const` 와 혼동해서는 안된다. `const` 단언문은 온전히 타입 공간의 기법이다.

```typescript
const v1 = {
  x: 1,
	y: 2,
}; // 타입은 { x: number; y: number; }

const v2 = {
	x: 1 as const,
	y: 2
}; 타입은 { x: 1, y: number; }

const v3 = {
	x: 1,
	y: 2,
} as const ; // 타입은 { readonly x: 1, readonly y: 2 }


const a1 = [1,2,3]; // 타입은 number[]
const a2 = [1,2,3] as const; // 타입은 readonly [1,2,3]
```
