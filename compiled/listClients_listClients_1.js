$(document).ready(function() {
    $('#clientsTable').DataTable($.extend({}, datatableDefaults, {
        "ajax": Routing.generate('cem_clients_liste'),
        "columns": [
            {"data": "nom"},
            {"data": "adresse"},
            {"data": "complement"},
            {"data": "CP"},
            {"data": "ville"},
            {"data": "telephone"},
            {"data": "fax"},
            {"data": "contact1"},
            {"data": "mail1"},
            {"data": "telContact1"},
            {"data": "details", "orderable": false}
        ]
    }));
});