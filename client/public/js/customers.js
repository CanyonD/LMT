$(document).ready(function () {
    let tmpValues = null;
    let customersList = document.getElementById("customers-list");

    let customerItemStyle = (value) => {
        let customer_code = value.customer_code === '' ? String.fromCharCode(160) : value.customer_code;
        return  '<a href="#" class="list-group-item" id="customer-list-id-' + value._id + '" itemscope="">' +
                    '<h5 class="list-group-item-heading">' +
                        '<span class="label label-success" itemprop="status">' +
                            'New' +
                        '</span>' +
                        '<span class="text-center" itemprop="name">' +
                            value.name +
                        '</span>' +
                    '</h5>' +
                    '<p class="list-group-item-text">' +
                        '<span itemprop="customer_code">' +
                            customer_code +
                        '</span>' +
                        '<span class="badge" itemprop="id">(' + ' ' + ')</span>' +
                    '</p>' +
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
        if (e.target.parentNode.id === '') {
            $(e.target.parentNode.parentNode).addClass("active");
            id = e.target.parentNode.parentNode.id;
        } else if (e.target.id === '') {
            $(e.target.parentNode).addClass("active");
            id = e.target.parentNode.id;
        } else {
            $(e.target).addClass("active");
            id = e.target.id;
        }
        id = id.split('customer-list-id-')[1];
        console.log(id);
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

                },
                error: () => {

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

        if ( values['_id'] ) {              // UPDATE
            $.ajax({
                url: '/api/v1/customers/' + values['_id'],
                method: "PUT",
                contentType: "application/json",
                data: jsonData,
                success: (values) => {
                    console.log(values);
                    window.location = window.location.href;
                }
            });
        } else {                            // CREATE
            delete values['_id'];
            $.ajax({
                url: '/api/v1/customers',
                method: "POST",
                contentType: "application/json",
                data: jsonData,
                success: (values) => {
                    console.log(values);
                    window.location = window.location.href;
                }
            });
        }
    });

    $('.add-new-item-button').click(() => {
        $('input').val('');
    });
});