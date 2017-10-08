$(document).ready(function () {
    let licensesList = document.getElementById("licenses-list");

    function refreshList(search = null) {
        licensesList.innerHTML = '';
        let licenseItemStyle = (value) => {
            let last_modify = value.changedAt === '' ? new Date(value.addedAt) : new Date(value.changedAt),
                status_icon,
                status_text,
                now = new Date();
            // console.log(new Date(value.addedAt));
            // console.log(new Date(now.setDate(now.getDate() - 7)));
            // console.log(new Date(value.addedAt) > new Date(now.setDate(now.getDate() - 7)));

            if (value.status === 1) {
                status_icon = 'danger';
                status_text = 'Trash';
            } else if ( new Date(value.addedAt) > new Date(now.setDate(now.getDate() - 7)) ) {
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
                               last_modify.toLocaleDateString() +
                            '</span>' +
                        '</p>' +
                    '</a>';
        };
        $.ajax({
            url: '/api/v1/licenses',
            dataType:'json',
            success: (names) => {
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


    $('#to').flatpickr({
        dateFormat: "d-m-Y",
        // mode: "range"
    });
    $('#from').flatpickr({
        dateFormat: "d-m-Y",
        // mode: "range"
    });

});