## 기술 스택

  - Typescript, Next.js, React-query, Zustand (필수)
  - CSS 라이브러리 (선택)

## 요구 사항
  - 상품 목록을 정렬 기능이 있는 테이블에 표시
    - 테이블 컬럼에는 상품 이름, 업로드일자, 상품 가격, 조회수가 표시되어야함
    - 테이블은 상품이름, 가격순, 상품 업로드 일자순으로 오름차순/내림차순 정렬이 가능해야함
    - 사용자의 정렬 옵션은 저장 가능하며, 페이지 호출 시 기존에 저장된 정렬 속성을 반영하여 API 가 호출되어야함
  - 테이블 정렬 설정을 저장 및 초기화 기능
  - 페이지네이션 구현 (react-query)
  - 상품 정보 팝업
    - 상품명 수정 기능
    - 이미지 목록 보기 기능
      - 개별 이미지 호버시 확대된 이미지가 기존 팝업 위에 표시됨

## API 
  - 상품 목록 API : GET /api/product/list?skip=0&take=10&sortList=[{%22price%22:%22desc%22}] 
  - 상품 목록 API : POST /api/product
    {
      id :number,
      title : string
    }
      
