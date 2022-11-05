// .d 파일은 선언 파일
import "styled-components";

// and extend them!
// styled component의 테마 정의를 확장하는것.
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    btnColor: string;
  }
}
