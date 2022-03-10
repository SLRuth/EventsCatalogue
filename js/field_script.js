jQuery(document).ready(() => {
  jQuery(".entity_field").change(function() {
    const row = this.name.match(/\[row-\d+\]/),
          $localField = jQuery(`.local_field[name*='${row}']`)

    $localField.prop('disabled', true)
    jQuery.ajax({
      type: 'POST',
      dataType: 'json',
      url: backend.url,
      data:  `&group=${this.value}&action=field_of_group`,
      success: (data) => {
        $localField.prop('disabled', false)
        $localField.empty()
        data.forEach(({ label, name }) => $localField.append(`<option value="${name}">${label}</option>`))
      }
    })
  })
})
