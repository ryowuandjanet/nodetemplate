import $ from 'jquery';
import axios from 'axios';

$(function() {
    let updateModal = $("#updateUserModal");
    let updateForm = $("#updateUserForm");

    $('button[name="delete-user"]').click(function() {
        let id = $(this).attr('id');
        axios.delete(`/users/delete/${id}`).then((response) => {
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        });
    });

    $('button[name="update-user"]').click(function() {
        let id = $(this).attr('id');
        axios.get(`/user/${id}`).then(response => {
            autoFillForm(updateForm, response.data);
            updateModal.modal('show');
        }).catch((err) => {
            console.log(err);
        });
    });

    function autoFillForm(form, data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                form.find(`input[name=${key}]`).val(data[key]);
            }
        }
    }

    $('#userUpdateSubmit').click((e) => {
        axios.put(`/user/update`, formDataObject(updateForm)).then(response => {
            updateModal.modal('hide');
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
        e.preventDefault();
    });

    function formDataObject(form) {
        let formDataObject = {};
        form.find(':input').not('[type="submit"]').not('[type="reset"]').each(function() {
            let input = $(this);
            formDataObject[input.attr('name')] = input.val();
        })
        return formDataObject;
    }


});