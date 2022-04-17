(($) => {
  const showConfiguration = ($select) => {
    const name = $select.val();
    if (name == "custom") {
      $(`[data-name*='mapping']`).show()
      $(`[data-name*='exporting']`).show()
      $(`[data-name*='importing']`).show()
    }
    else {
      $(`[data-name*='mapping']`).hide()
      $(`[data-name*='exporting']`).hide()
      $(`[data-name*='importing']`).hide()
    }
  }
  $(document).ready(() => {
    const $typeSelect = $("[data-name='schema'] select")
    showConfiguration($typeSelect)
    $typeSelect.change(() => showConfiguration($typeSelect))
  })
})(jQuery)
