$(document).ready(function() {
    $('#fournisseursTable').DataTable($.extend({}, datatableDefaults, {
        "ajax": Routing.generate('cem_fournisseurs_liste'),
        "columns": [
            {"data": "nom"},
            {"data": "adresse"},
            {"data": "complement"},
            {"data": "CP"},
            {"data": "ville"},
            {"data": "tel"},
            {"data": "fax"},
            {"data": "contact1"},
            {"data": "contact2"},
            {"data": "details", "orderable": false}
        ]
    }));
});