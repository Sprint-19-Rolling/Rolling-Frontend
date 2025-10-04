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
