$(document).ready(function () {
    let tmpValues = null;
    let customersList = document.getElementById("customers-list");

    let customerItemStyle = (value) => {
        return '<a href="#" class="list-group-item" id="customer-list-id-' + value._id + '">' +
                '<h5 class="global-menu-item">' +
                    value.name +
                '</h5>' +
            '</a>';
    };

    $.ajax({
        url: '/api/v1/customers',
        dataType:'json',
        success: (names) => {
            tmpValues = names;
            names.forEach( (item) => {
                customersList.innerHTML += customerItemStyle(item);
            });
        }
    });

    $(customersList).click('click',(e) => {
        $("#customers-list").find('*').removeClass("active");
        let id;
        if (e.target.id === '') {
            $(e.target.parentNode).addClass("active");
            id = e.target.parentNode.id;
        } else {
            $(e.target).addClass("active");
            id = e.target.id;
        }
        id = id.split('customer-list-id-')[1];
        if (id) {
            $.ajax({
                url: '/api/v1/customers/' + id,
                dataType:'json',
                success: (values) => {
                    $('input#_id').val( values._id );
                    $('input#name').val( values.name );
                    $('input#description').val( values.description );
                    $('input#email').val( values.email );
                    $('input#phone').val( values.phone );
                    $('input#address').val( values.address );
                    $('input#customer_code').val( values.customer_code );

                }
            });
        }
    });

    $('.function-save-button').click(() => {
        const values = {};
        values['name'] = $('input#name').val();
        values['description'] = $('input#description').val();
        values['_id'] = $('input#_id').val();
        values['email'] = $('input#email').val();
        values['phone'] = $('input#phone').val();
        values['address'] = $('input#address').val();
        values['customer_code'] = $('input#customer_code').val();
        let jsonData = JSON.stringify(values);

        if ( values['_id'] ) {
            console.log(values['_id']);
            $.ajax({
                url: '/api/v1/customers/' + values['_id'],
                method: "PUT",
                contentType: "application/json",
                // dataType: "json",
                data: jsonData,
                success: (values) => {
                    console.log(values);
                }
            });
        }
    });

    // $('#email').flatpickr({
    //     dateFormat: "d-m-Y",
    //     mode: "range"
    // });
});