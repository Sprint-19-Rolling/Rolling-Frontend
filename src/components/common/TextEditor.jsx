import { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '@/style/base/quill-custom.css';

// 색상 팔레트
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

// Quill 폰트 설정
const Font = Quill.import('formats/font');
Font.whitelist = ['noto-sans', 'pretendard', 'nanum-myeongjo', 'handletter'];
Quill.register(Font, true);

// 글꼴 유지 기능
const useFontPersistence = (reactQuillRef) => {
  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) {
      return;
    }

    const handleTextChange = (delta, oldDelta, source) => {
      if (source !== 'user') {
        return;
      }
      const ops = delta.ops;
      if (!ops) {
        return;
      }

      for (let i = 0; i < ops.length; i++) {
        const op = ops[i];
        if (op.insert === '\n') {
          const selection = quill.getSelection();
          if (!selection || selection.length !== 0) {
            continue;
          }
          const previousIndex = selection.index - 1;
          if (previousIndex < 0) {
            continue;
          }
          const previousFormat = quill.getFormat(previousIndex, 1);
          if (previousFormat.font) {
            setTimeout(() => {
              const currentSelection = quill.getSelection();
              if (currentSelection && currentSelection.length === 0) {
                quill.format('font', previousFormat.font, 'user');
              }
            }, 0);
          }
        }
      }
    };

    quill.on('text-change', handleTextChange);
    return () => quill.off('text-change', handleTextChange);
  }, [reactQuillRef]);
};

// 체크리스트 툴바 상태 관리
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

      const buttons = {
        check: toolbar.querySelector('button.ql-list[value="check"]'),
        ordered: toolbar.querySelector('button.ql-list[value="ordered"]'),
        bullet: toolbar.querySelector('button.ql-list[value="bullet"]'),
      };

      Object.entries(buttons).forEach(([key, btn]) => {
        if (btn) {
          btn.classList.toggle('ql-active', formats.list === key);
        }
      });
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
        const uiElement = item.querySelector('.ql-ui');
        if (uiElement) {
          uiElement.setAttribute(
            'data-color-init',
            formats.checked === true ? 'purple' : 'gray'
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
      quill.formatLine(index, 1, { checked: !formats.checked });
      quill.setSelection(index, 0, 'silent');
      updateToolbarButtons();
    };

    const handleTextChange = () => {
      updateToolbarButtons();
      updateChecklistColors();
    };

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

const TextEditor = ({ value, onChange, onFontChange, font }) => {
  const reactQuillRef = useRef(null);
  const lastSelectionFontRef = useRef(null);

  const handleChange = (content) => {
    onChange(content);
  };

  useFontPersistence(reactQuillRef);
  useChecklistToolbarManager(reactQuillRef);

  // 외부 Dropdown에서 선택된 폰트 → 선택된 영역에만 적용 (수정됨!)
  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill || !font) {
      return;
    }

    const range = quill.getSelection();

    if (!range) {
      // 포커스가 없으면 다음 입력에 적용될 포맷만 설정
      quill.format('font', font, 'api');
    } else if (range.length === 0) {
      // 커서만 있고 선택 영역이 없으면 다음 입력에 적용
      quill.format('font', font, 'api');
    } else {
      // 선택 영역이 있으면 해당 영역에만 폰트 적용
      quill.formatText(range.index, range.length, { font }, 'api');
    }

    lastSelectionFontRef.current = font;
  }, [font]);

  // Quill에서 글꼴 변경 감지 → 외부로 전달 (툴바 사용 시만)
  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill || !onFontChange) {
      return;
    }

    const handleTextChange = (delta, oldDelta, source) => {
      if (source !== 'user') {
        return;
      }

      const hasFontChange = delta.ops?.some((op) => op.attributes?.font);
      if (!hasFontChange) {
        return;
      }

      const range = quill.getSelection();
      if (!range) {
        return;
      }

      const format = quill.getFormat(range);
      if (format.font && format.font !== lastSelectionFontRef.current) {
        lastSelectionFontRef.current = format.font;
        onFontChange(format.font);
      }
    };

    quill.on('text-change', handleTextChange);
    return () => quill.off('text-change', handleTextChange);
  }, [onFontChange]);

  // 에디터 공백 감지 (placeholder 처리)
  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) {
      return;
    }
    const root = quill.root;
    let disposed = false;

    const getVisibleText = () =>
      (root.textContent || '')
        .replace(/[\u200B\uFEFF\u00A0]/g, '')
        .replace(/\n/g, '')
        .trim();

    const hasContent = () => {
      if (getVisibleText().length > 0) {
        return true;
      }
      const hasLists = root.querySelector('ol, ul');
      if (hasLists) {
        return true;
      }
      const hasBlocks = root.querySelector('img, iframe, video');
      if (hasBlocks) {
        return true;
      }
      return false;
    };

    const syncBlankClass = () => {
      if (disposed) {
        return;
      }
      root.classList.toggle('ql-blank', !hasContent());
    };

    const handleTextChange = () => syncBlankClass();
    const handleInput = () => syncBlankClass();
    const handleCompositionEnd = () => setTimeout(syncBlankClass, 0);

    quill.on('text-change', handleTextChange);
    quill.on('selection-change', syncBlankClass);
    root.addEventListener('input', handleInput);
    root.addEventListener('keyup', handleInput);
    root.addEventListener('compositionend', handleCompositionEnd);

    syncBlankClass();

    return () => {
      disposed = true;
      quill.off('text-change', handleTextChange);
      quill.off('selection-change', syncBlankClass);
      root.removeEventListener('input', handleInput);
      root.removeEventListener('keyup', handleInput);
      root.removeEventListener('compositionend', handleCompositionEnd);
    };
  }, [reactQuillRef]);

  // 툴바 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: Font.whitelist }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ header: [3, 4, 5, false] }],
          ['image', 'link'],
          [{ color: QUILL_COLORS }, { background: QUILL_COLORS }],
          ['clean'],
        ],
        handlers: {
          clean() {
            const range = this.quill.getSelection();
            if (range) {
              this.quill.removeFormat(range.index, range.length);
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
        value={value || ''}
        onChange={handleChange}
        modules={modules}
        placeholder="여기에 내용을 입력해주세요."
      />
    </div>
  );
};

export default TextEditor;
