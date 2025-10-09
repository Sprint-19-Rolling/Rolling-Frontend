/**
 * @file toast.js
 * @description Toast 컴포넌트에서 사용하는 상수 정의 파일입니다.
 * 자동 닫힘 시간, 애니메이션 지속 시간, 아이콘 매핑 등을 포함합니다.
 */

import icons from '@/assets/icons/icons';

/**
 * 토스트 메시지가 자동으로 닫히기 전까지 유지되는 시간(ms 단위)
 * @type {number}
 * @default 3000
 */
export const AUTO_CLOSE_DELAY = 3000;

/**
 * fade-out 애니메이션이 완료될 때까지의 지속 시간(ms 단위)
 * @type {number}
 * @default 200
 */
export const FADE_OUT_DURATION = 200;

/**
 * 토스트 유형별 아이콘 매핑 객체
 * @type {{ success: JSX.Element, error: JSX.Element }}
 */
export const ICON_MAP = {
  success: <icons.CompletedIcon className="text-green-500" />,
  error: <icons.ErrorIcon className="text-red-500" />,
};
