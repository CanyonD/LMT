$(document).ready(function () {
    let licensesList = document.getElementById("licenses-list");

    function refreshList(search = null) {
        licensesList.innerHTML = '';
        let licenseItemStyle = (value) => {
            let last_modify = value.changedAt === '' ? new Date(value.addedAt) : new Date(value.changedAt),
                status_icon,
                status_text,
                now = new Date();

            if (value.status === 1) {
                status_icon = 'danger';
                status_text = 'Trash';
            } else if ( new Date(value.valid_until*1000) < new Date(now) ) {
                status_icon = 'warning';
                status_text = 'Expired';
            } else if ( new Date(value.addedAt*1000) > new Date(now.setDate(now.getDate() - 7)) ) {
                status_icon = 'success';
                status_text = 'New';
            } else {
                status_icon = 'primary';
                status_text = 'Active';
            }

            return  '<a href="#" class="list-group-item" id="license-list-id-' + value._id + '" itemscope="">' +
                        '<h5 class="list-group-item-heading">' +
                            '<span class="label label-' + status_icon + '" itemprop="status">' +
                                status_text +
                            '</span>' +
                            '<span class="text-center" itemprop="name">' +
                                value.customer_name +
                            '</span>' +
                        '</h5>' +
                        '<p class="list-group-item-text">' +
                            '<span class="badge" itemprop="id" title="' + value._id.toUpperCase() + '">GUID</span>' +
                            '<span itemprop="customer_code">' +
                                'until ' + new Date(value.valid_until*1000).toLocaleDateString() +
                            '</span>' +
                            '<br>' +
                            '<span itemprop="functions">' +
                                'All functions' +
                            '</span>' +
                        '</p>' +
                    '</a>';
        };
        $.ajax({
            url: '/api/v1/licenses',
            dataType:'json',
            success: (res) => {
                let names = res.rows;
                names.forEach( (item) => {
                    if (search === null) {
                        licensesList.innerHTML += licenseItemStyle(item);
                    } else {
                        if ( item.name.indexOf(search) > -1 ) {
                            licensesList.innerHTML += licenseItemStyle(item);
                        }
                    }
                });
                let current_id = $('input#_id').val();
                if (current_id !== null && current_id !== '') {
                    $("#license-list-id-" + current_id).addClass("active");
                }
            }
        });

    };
    refreshList();

    $(licensesList).click('click',(e) => {
        $("#licenses-list").find('*').removeClass("active");
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
        id = id.split('license-list-id-')[1];
        console.log(id);
        if (id) {
            $.ajax({
                url: '/api/v1/licenses?_id=' + id,
                dataType:'json',
                success: (res) => {
                    console.log(res);
                },
                error: () => {

                }
            });
        }
    });


    $('#to').flatpickr({
        dateFormat: "d-m-Y",
        // mode: "range"
    });
    $('#from').flatpickr({
        dateFormat: "d-m-Y",
        // mode: "range"
    });

    let functionsList = document.getElementById("functions-list");

    function listFunctions() {
        functionsList.innerHTML =
            '<table id="table"' +
            'data-toggle="table"' +
            // 'data-height="362"' +
            'data-height="364"' +
            'data-url="api/v1/users"' +
            'data-search="true"' +
            'data-side-pagination="server"' +
            'data-pagination="true"' +
            'data-page-list="[5, 10, 20, 50]"' +
            '>' +
            '<thead>' +
            '<tr>' +
            // '<th data-field="_id">#</th>' +
            '<th data-field="username" data-sortable="true">Name</th>' +
            '<th data-field="email" data-sortable="true">E-mail</th>' +
            '<th data-field="addedAt" data-sortable="true">Added At</th>' +
            '<th data-field="role" data-sortable="true">Role</th>' +
            '</tr>' +
            '</thead>' +
            '</table>'
        ;

        var $table = $('#table');
        $table.bootstrapTable();
    }

    console.log(functionsList);
    listFunctions();
});