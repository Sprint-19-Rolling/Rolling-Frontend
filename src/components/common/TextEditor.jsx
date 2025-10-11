import { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import '@/style/base/quill-custom.css';

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

const Font = Quill.import('formats/font');
Font.whitelist = ['Noto Sans', 'Pretendard', 'Nanum Myeongjo', 'Handletter'];
Quill.register(Font, true);

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

const TextEditor = ({ value, onChange, onFontChange }) => {
  const reactQuillRef = useRef(null);

  useFontPersistence(reactQuillRef);
  useChecklistToolbarManager(reactQuillRef);

  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill || !onFontChange) {
      return;
    }

    const handleSelectionChange = (range) => {
      if (!range) {
        return;
      }
      const format = quill.getFormat(range);
      if (format.font) {
        onFontChange(format.font);
      } else {
        onFontChange('Noto Sans'); // 기본값
      }
    };

    quill.on('selection-change', handleSelectionChange);
    return () => quill.off('selection-change', handleSelectionChange);
  }, [onFontChange]);

  useEffect(() => {
    const quill = reactQuillRef.current?.getEditor();
    if (!quill) {
      return;
    }
    const root = quill.root;
    let disposed = false;

    const getVisibleText = () => {
      const raw = root.textContent || '';
      return raw
        .replace(/[\u200B\uFEFF\u00A0]/g, '')
        .replace(/\n/g, '')
        .trim();
    };

    const syncBlankClass = () => {
      if (disposed) {
        return;
      }
      const isEmpty = getVisibleText().length === 0;
      root.classList.toggle('ql-blank', isEmpty);
    };

    const handleTextChange = () => syncBlankClass();
    const handleInput = () => syncBlankClass();
    const handleCompositionEnd = () => {
      setTimeout(syncBlankClass, 0);
    };

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
        onChange={onChange}
        modules={modules}
        placeholder="여기에 내용을 입력해주세요."
      />
    </div>
  );
};

export default TextEditor;
