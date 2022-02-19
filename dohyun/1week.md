# 1Week

## enum은 타입과 값 두가지로 사용될 수 있음

- javascript로 컴파일되도 남아있다는 뜻.

```typescript
enum Path {
  Home = "/",
}

const path = Path.Home;
```

<br />

## 타입 단언 보다는 타입 선언을 사용하기

```typescript
interface Position {
  x: number;
  y: number;
}

const position: Position = {}; // error: '{}' 형식에 'Position' 형식의 x, y 속성이 없습니다.

const position2 = {} as Position; // no error

const position3: Position = {
  x: 1,
  y: 1,
  z: 1,
}; // error: '{ x: number; y: number; z: number; }' 형식은 'Position' 형식에 할당할 수 없습니다.

const position4 = {
  x: 1,
  y: 1,
  z: 1,
} as Position; // no error
```

- 타입 선언은 할당되는 값이 인터페이스를 만족하는지 검사함.
- 타입 단언은 타입 체커에게 오류를 무시하라고함.

-> <b>타입 단언이 꼭 필요한 경우가 아니라면, 안전성 체크도 되는 타입 선언을 사용하자!</b>

그렇다면 타입 단언이 꼭 필요한 경우가 언제인가? 바로 DOM 엘리먼트 같이 타입스크립트가 접근할 수 없는 곳에서는 타입스크립트보다 우리가 더 타입을 잘 알고있기 때문에 타입 단언을 사용하면 된다.

```typescript
document.querySelector("#Id") as HTMLElement;
```

- 맨 뒤에 `!`를 붙이면 null이 아님을 단언하는 문법이다.( 변수의 접두사로 쓰인 `!`는 `boolean`의 부정문임, 그러나 접미사로 쓰인 `!`은 그 값이 `null`이 아니라는 단언문으로 쓰인다)
  - 리액트에서 굉장히 유용하게 쓰일 거 같다.
    ```jsx
    useEffect(() => {
      if (ref.current) {
        ref.current.focus();
      }
    }, [ref]);
    ```

<br />

## 잉여속성 체크의 한계 인지하기

- 잉여 속성 체크에는 한계가 있다. 임시 변수를 도입하면 잉여 속성 체크를 건너뛸 수 있다는 점을 기억해야 한다. (임시 변수 사용을 조심하자.)

```typescript
interface Position {
  x: number;
  y: number;
}

const position: Position = { x: 0, y: 0, z: 1 }; // error '{ x: number; y: number; z: number; }' 형식은 'Position' 형식에 할당할 수 없습니다.

const temp = { x: 0, y: 0, z: 0 };
const position: Position = temp; // no error
```

<br />

## 타입과 인터페이스의 차이점 알기

> interface 앞에 I를 붙이는 것은 C#에서 비롯된 관례이다. 이 영향을 받아 타입스크립트 초기에는 종종 사용하였으나 현재는 지양해야할 스타일로 여겨진다. 표준 라이브러리에서도 일관성 있게 도입되지 않았기 때문에 유용하지도 않다.

- 인터페이스만 있는 기능: <b>타입 선언 보강</b>

```typescript
interface Position {
  x: number;
  y: number;
}

interface Position {
  z: number;
}

const position: Position = {
  x: 1,
  y: 1,
  z: 1,
};
```

- 아직 타입 스타일이 확립되지 않은 프로젝트라면, 향후에 보강의 가능성이 있을지 생각해봐야 한다.
- 어떤 API에 대한 타입 선언을 작성해야 한다면 인터페이스를 사용하는게 좋다. API가 변경될 때 사용자가 인터페이스를 통해 새로운 필드를 병합할 수 있어 유용하기 때문이다.

<br />

## 타입 연산과 제네릭 사용으로 반복 줄이기

- 이미 존재하는 타입에서 확장할 경우

```typescript
interface Position {
  x: number;
  y: number;
}

interface ZPosition extends Position {
  z: number;
}
```

- 이미 존재하는 타입에서 축소할 경우

```typescript
interface Position {
  x: number;
  y: number;
  z: number;
}

type XYPosition = Pick<Position, "x" | "y">;
```
