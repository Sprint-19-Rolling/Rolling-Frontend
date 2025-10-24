/**
 * 플로팅 버튼(Floating Button)을 담는 컨테이너 컴포넌트입니다.
 * 뷰포트 하단에 고정되어 표시되다가, 태블릿 크기 이상(`md`)에서는
 * 일반적인 문서 흐름(static)으로 전환됩니다.
 *
 * @component
 * @param {object} props - 컴포넌트의 props
 * @param {React.ReactNode} props.children - 컨테이너 내부에 렌더링될 버튼 또는 다른 콘텐츠
 * @returns {JSX.Element} 플로팅 버튼 컨테이너
 */
const FloatingButtonContainer = ({ children }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex w-full justify-center bg-white p-6 md:static md:p-0">
      {children}
    </div>
  );
};

export default FloatingButtonContainer;
