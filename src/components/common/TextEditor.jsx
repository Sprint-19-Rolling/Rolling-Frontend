import { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '../../style/base/quill-custom.css';

// 🎨 공통 색상 팔레트 상수 정의
const QUILL_COLORS = [
  '#000000',
  '#e60000',
  '#ff9900',
  '#ffff00',
  '#008a00',
  '#0066cc',
  '#9933ff',
  '#ffffff',
  '#facccc',
  '#ffebcc',
  '#ffffcc',
  '#cce8cc',
  '#cce0f5',
  '#ebd6ff',
  '#bbbbbb',
  '#f06666',
  '#ffc266',
  '#ffff66',
  '#66b966',
  '#66a3e0',
  '#c285ff',
  '#888888',
  '#a10000',
  '#b26b00',
  '#b2b200',
  '#006100',
  '#0047b2',
  '#6b24b2',
  '#444444',
  '#5c0000',
  '#663d00',
  '#666600',
  '#003700',
  '#002966',
  '#3d1466',
];

// 폰트 화이트리스트 설정
const Font = Quill.import('formats/font');
Font.whitelist = ['noto-sans', 'pretendard', 'nanum-myeongjo', 'handletter'];
Quill.register(Font, true);

// 체크리스트 툴바 및 상태 동기화 커스텀 훅
const useChecklistToolbarManager = (reactQuillRef) => {
  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) {
      return;
    }

    const container = quill.root;

    const updateToolbarButtons = () => {
      const range = quill.getSelection();
      if (!range) {
        return;
      }

      const formats = quill.getFormat(range);
      const toolbar = quill.getModule('toolbar')?.container;
      if (!toolbar) {
        return;
      }

      const checkButton = toolbar.querySelector(
        'button.ql-list[value="check"]'
      );
      const orderedButton = toolbar.querySelector(
        'button.ql-list[value="ordered"]'
      );
      const bulletButton = toolbar.querySelector(
        'button.ql-list[value="bullet"]'
      );

      if (checkButton) {
        checkButton.classList.toggle('ql-active', formats.list === 'check');
      }
      if (orderedButton) {
        orderedButton.classList.toggle('ql-active', formats.list === 'ordered');
      }
      if (bulletButton) {
        bulletButton.classList.toggle('ql-active', formats.list === 'bullet');
      }
    };

    const updateChecklistColors = () => {
      const items = container.querySelectorAll('li[data-list="check"]');
      items.forEach((item) => {
        const blot = Quill.find(item);
        if (!blot) {
          return;
        }

        const index = quill.getIndex(blot);
        const formats = quill.getFormat(index, 1);
        const isChecked = formats.checked === true;

        const uiElement = item.querySelector('.ql-ui');
        if (uiElement) {
          uiElement.setAttribute(
            'data-color-init',
            isChecked ? 'purple' : 'gray'
          );
        }
      });
    };

    const handleClick = (e) => {
      const listItem = e.target.closest('li[data-list="check"]');
      if (!listItem) {
        return;
      }

      const blot = Quill.find(listItem);
      if (!blot) {
        return;
      }

      const index = quill.getIndex(blot);
      const formats = quill.getFormat(index, 1);
      const isChecked = formats.checked === true;

      quill.formatLine(index, 1, { checked: !isChecked });
      quill.setSelection(index, 0, 'silent');

      updateToolbarButtons();
    };

    const handleTextChange = () => {
      updateToolbarButtons();
      updateChecklistColors();
    };

    // 초기 상태 동기화
    updateToolbarButtons();
    updateChecklistColors();

    quill.on('selection-change', updateToolbarButtons);
    quill.on('text-change', handleTextChange);
    container.addEventListener('click', handleClick);

    return () => {
      quill.off('selection-change', updateToolbarButtons);
      quill.off('text-change', handleTextChange);
      container.removeEventListener('click', handleClick);
    };
  }, [reactQuillRef]);
};

const TextEditor = ({ value, onChange }) => {
  const reactQuillRef = useRef(null);

  // 체크리스트 상태 관리 훅 실행
  useChecklistToolbarManager(reactQuillRef);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ header: [3, 4, 5, false] }],
          ['image', 'link'],
          [{ color: QUILL_COLORS }, { background: QUILL_COLORS }],
          ['clean'],
        ],
        handlers: {
          clean: function () {
            const range = this.quill.getSelection();
            if (range) {
              this.quill.removeFormat(range.index, range.length);
              if (range.length > 0) {
                this.quill.formatText(
                  range.index,
                  range.length,
                  'font',
                  'Font.whitelist[0]'
                );
              }
            }
          },
        },
      },
    }),
    []
  );

  return (
    <div className="editor-wrapper-react">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        placeholder="여기에 내용을 입력해주세요."
      />
    </div>
  );
};

export default TextEditor;
