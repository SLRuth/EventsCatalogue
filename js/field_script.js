(($) => {
  function updateCorrespondingField() {
    const repeaterName = $(this).parents("div.acf-field").attr("data-name"),
          row = $(this).parents("[class*='acf-row']").attr("data-id"),
          $localField = $(`[data-name='${repeaterName}'] .local_field[name*='${row}']`)

    $localField.prop('disabled', true)
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: backend.url,
      data:  `&group=${this.value}&action=field_of_group`,
      success: (data) => {
        value = $localField.val()
        $localField.prop('disabled', false)
        $localField.empty()
        data.forEach(({ label, name }) => {
          if (name == value) $localField.append(`<option selected value="${name}">${label}</option>`)
          else $localField.append(`<option value="${name}">${label}</option>`)
        })
      }
    })
  }
  function initializeValues() {
    const params = new URLSearchParams(window.location.search),
          post = params.get("post")

    document
      .querySelectorAll('.entity_field')
      .forEach(field => updateCorrespondingField.apply(field, []))

    document
      .querySelectorAll("div.acf-field.acf-field-repeater")
      .forEach(field => {
        const fieldId = $(field).attr('data-key')

        $.ajax({
          type: 'POST',
          dataType: 'json',
          url: backend.url,
          data: `&field=${fieldId}&id=${post}&action=value_of_post`,
          success: (data) => {
            data.forEach((entry, index) => {
              if (entry.entity_type == "Event") return;

              console.log(entry, index)
              console.log($(`.local_field[name*=row-${index}]`))
              $(`.local_field[name*=row-${index}]`).val(entry.local_field)
            })
          }
        })
      })
  }
  $(document).ready(() => {
    // Initialize values
    initializeValues()

    // Reactive requests
    $(".entity_field").change(updateCorrespondingField)
    document.querySelectorAll(".acf-repeater.-table").forEach(el => {
      new MutationObserver(() => {
        $(".entity_field").off("change", updateCorrespondingField)
        $(".entity_field").change(updateCorrespondingField)
      }).observe(el, {
        childList: true,
        subtree: true
      })
    })
  })

})(jQuery)
