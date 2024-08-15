export function placeCaretAtEnd(el, focus) {
    focus && el.focus()

    const range = document.createRange()
    range.selectNodeContents(el)
    range.collapse(false)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
}
