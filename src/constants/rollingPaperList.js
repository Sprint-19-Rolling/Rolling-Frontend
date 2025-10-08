/**
 * 롤링페이퍼 리스트 페이지에서
 * 사용하는 상수값을 정리한 파일입니다.
 */

/**
 * 초기 로딩 시 MessageList에 표시할 그리드 슬롯의 총 개수입니다.
 */
const MESSAGE_LIST_SKELETON_COUNT = 3;

export const MESSAGE_LIST_SKELETON_ARRAY = Array.from({
  length: MESSAGE_LIST_SKELETON_COUNT,
});

/**
 * 롤링페이퍼 메세지 limit → 최대 8개
 * 리액션 limit → 최대 8개
 */
export const RECIPIENT_PAGE_LIMIT = 8;

/**
 * 리액션 limit -> 6개 (모바일, 태블릿)
 */
export const RECIPIENT_PAGE_LIMIT_TABLET = 6;

/**
 * 반응형 크기에 따른 리액션 limit를 지정하기 위한
 * 브레이크 포인트 상수
 */
export const BREAKPOINT_TABLET = 767;
