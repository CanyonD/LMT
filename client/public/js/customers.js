$(document).ready(function () {
    let customersList = document.getElementById("customers-list");

    function refreshList(search = null, sort = null, filter = null) {
        customersList.innerHTML = '';
        let customerItemStyle = (value) => {
            let customer_code = value.customer_code === '' ? String.fromCharCode(160) : value.customer_code,
                status_icon,
                status_text;

            if (value.status === 1) {
                status_icon = 'danger';
                status_text = 'Trash';
            } else if (value.addedAt < (Date.now() + 360)) {
                status_icon = 'success';
                status_text = 'New';
            } else {
                status_icon = 'primary';
                status_text = 'Active';
            }

            return  '<a href="#" class="list-group-item" id="customer-list-id-' + value._id + '" itemscope="">' +
                        '<h5 class="list-group-item-heading">' +
                            '<span class="label label-' + status_icon + '" itemprop="status">' +
                                status_text +
                            '</span>' +
                            '<span class="text-center" itemprop="name">' +
                                value.name +
                            '</span>' +
                        '</h5>' +
                        '<p class="list-group-item-text">' +
                            '<span class="badge" itemprop="id" title="' + value._id.toUpperCase() + '">GUID</span>' +
                            '<span itemprop="customer_code">' +
                                customer_code +
                            '</span>' +
                        '</p>' +
                    '</a>';
        };

        let url = '/api/v1/customers?';
        url += search !== null ? 'search=' + search : '';
        url += sort !== null ? '&sort=' + sort : '';
        url += filter !== null ? '&filter=' + filter : '';
        $.ajax({
            url: url,
            dataType:'json',
            success: (names) => {
                names.rows.forEach( (item) => {
                    customersList.innerHTML += customerItemStyle(item);
                });
                let current_id = $('input#_id').val();
                if (current_id !== null && current_id !== '') {
                    $("#customer-list-id-" + current_id).addClass("active");
                }
            }
        });

    };
    refreshList();

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
                success: (res) => {
                    $('input#_id').val( res._id );
                    $('input#name').val( res.name );
                    $('input#description').val( res.description );
                    $('input#email').val( res.email );
                    $('input#phone').val( res.phone );
                    $('input#address').val( res.address );
                    $('input#customer_code').val( res.customer_code );
                    if (res.status === 1)
                        $('.function-trash-button').html('Restore from trash');
                    else
                        $('.function-trash-button').html('Move to trash');
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
                success: (res) => {
                    console.log(res);
                    refreshList();
                }
            });
        } else {                            // CREATE
            delete values['_id'];
            $.ajax({
                url: '/api/v1/customers',
                method: "POST",
                contentType: "application/json",
                data: jsonData,
                success: (res) => {
                    console.log(res);
                    $('input#_id').val( res._id );
                    refreshList();
                }
            });
        }
    });

    $('.function-trash-button').click(() => {
        let values = {};
            values['_id'] = $('input#_id').val();
        if ($('.function-trash-button').html() === 'Restore from trash') {
            values['status'] = 0;
        } else {
            values['status'] = 1;
        }
        let jsonData = JSON.stringify(values);

        if ( values['_id'] ) {              // UPDATE
            $.ajax({
                url: '/api/v1/customers/' + values['_id'],
                method: "PUT",
                contentType: "application/json",
                data: jsonData,
                success: (res) => {
                    console.log(res);
                    refreshList();

                    if (values['status'] === 1)
                        $('.function-trash-button').html('Restore from trash');
                    else
                        $('.function-trash-button').html('Move to trash');

                }
            });
        }
    });

    $('.search-field').keyup(() => {
        let value = $('.search-field').val();
        if (value.length > 1) {
            refreshList(value);
        } else if (value === '') {
            refreshList();
        }
    });

    $('.search-clear').click(() => {
        $('.search-field').val('');
        refreshList();
    });

    $('.add-new-item-button').click(() => {
        $('input').val('');
    });

    $('.btn-filter-new').click(() => {
        const that = $('.btn-filter-new');
        if (that.hasClass('active')) {
            that.removeClass("active");
        } else {
            that.addClass("active");
        }
    });

    $('.btn-filter-without').click(() => {
        const that = $('.btn-filter-without');
        if (that.hasClass('active')) {
            that.removeClass("active");
        } else {
            that.addClass("active");
        }
    });

    $('.btn-filter-active').click(() => {
        const that = $('.btn-filter-active');
        if (that.hasClass('active')) {
            that.removeClass("active");
        } else {
            that.addClass("active");
        }
    });

    $('.btn-filter-trash').click(() => {
        let search = $('.search-field').val();
        if (search.length > 1) {
            refreshList(search, null, 1);
        } else if (search === '') {
            refreshList(null, null, 1);
        }
        const that = $('.btn-filter-trash');
        if (that.hasClass('active')) {
            that.removeClass("active");
        } else {
            that.addClass("active");
        }
    });


});