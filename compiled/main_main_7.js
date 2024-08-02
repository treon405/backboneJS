function autocollapse() {
    var navbar = $('.navbar.navbar-collapse');
    navbar.removeClass('collapsed');
    if(navbar.innerHeight() > 50) {
    	navbar.addClass('collapsed');
    }
}
$(document).on('ready', autocollapse);
$(window).on('resize', autocollapse);
var datatableDefaults = {
    "language": {
        "sProcessing":     "Traitement en cours...",
        "sSearch":         "Rechercher&nbsp;:",
        "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
        "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
        "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        "sInfoPostFix":    "",
        "sLoadingRecords": "Chargement en cours...",
        "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
        "oPaginate": {
            "sFirst":      "Premier",
            "sPrevious":   "Pr&eacute;c&eacute;dent",
            "sNext":       "Suivant",
            "sLast":       "Dernier"
        },
        "oAria": {
            "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
        }
    }
};

$(document).ready(function() {
    var d = new Date();
    var hr = d.getHours();
    if (hr < 10) {
        hr = "0" + hr;
    }
    var min = d.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var sec = d.getSeconds();
    if (sec < 10) {
        sec = "0" + sec;
    }
    var time = '' + hr + ':' + min + ':' + sec;
    
    $('.js-datepicker').datepicker({
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
        dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        weekHeader: 'Sem.',
        dateFormat: 'DD dd MM yy',
        altField: '.altDateBDC',
        altFormat: 'yy-mm-dd ' + time,
        firstDay: 1
    });

});

// -------------------------------------------------------------------------
// Fonction/Variables communes
// gérant l'ouverture, la gestion des popups
// ----------------------------------------------------------------------------

function openAddModal(url) {
    $('#addModal').on('click', function() {
        openEditModal(url);
    });
}

function openEditModal(url) {
    $("#edit_form_container").load(url + ' #edit_form_container > *', function (html) {
        $('#edit-modal').modal('show');
        $('#edit-modal #titleContainer').empty();
        $('#edit-modal .modal-body h4').appendTo('#edit-modal #titleContainer');
        mbs.init.form();
    });
}

function openContentModal(html) {
    $('#edit-modal .modal-body').html(html);
    $('#edit-modal').modal('show');
    $('#edit-modal #titleContainer').empty();
    $('#edit-modal .modal-body h4').appendTo('#edit-modal #titleContainer');
    mbs.init.form();
}

function array_search (needle, haystack, argStrict) {
  //  discuss at: http://phpjs.org/functions/array_search/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //    input by: Brett Zamir (http://brett-zamir.me)
  // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  //  depends on: array
  //        test: skip
  //   example 1: array_search('zonneveld', {firstname: 'kevin', middle: 'van', surname: 'zonneveld'});
  //   returns 1: 'surname'
  //   example 2: ini_set('phpjs.return_phpjs_arrays', 'on');
  //   example 2: var ordered_arr = array({3:'value'}, {2:'value'}, {'a':'value'}, {'b':'value'});
  //   example 2: var key = array_search(/val/g, ordered_arr); // or var key = ordered_arr.search(/val/g);
  //   returns 2: '3'

  var strict = !!argStrict,
    key = ''

  if (haystack && typeof haystack === 'object' && haystack.change_key_case) {
    // Duck-type check for our own array()-created PHPJS_Array
    return haystack.search(needle, argStrict)
  }
  if (typeof needle === 'object' && needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      var flags = 'i' + (needle.global ? 'g' : '') +
        (needle.multiline ? 'm' : '') +
        // sticky is FF only
        (needle.sticky ? 'y' : '')
      needle = new RegExp(needle.source, flags)
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (needle.test(haystack[key])) {
          return key
        }
      }
    }
    return false;
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key
      }
    }
  }

  return false ;
}

var mbs = {
    init: {
        datePicker: function () {
            jQuery.datetimepicker.setLocale('fr');
            var i=1;
            $('input.date').each(function () {
                var tmpinput = $(this);
                if(tmpinput.data('format')===undefined){
                    tmpinput.data('format','d/m/Y');
                }
                $('#datepicker'+i).remove();
                tmpinput.data('dtp','#datepicker'+i);
                tmpinput.datetimepicker({
                    timepicker:tmpinput.hasClass("withtime"),
                    format: tmpinput.data('format'),
                    dayOfWeekStart: 1,
                    id:'datepicker'+i,
                    scrollInput: false
                });

                $('#edit-modal').on('scroll',function() {
                    if ($(tmpinput.data('dtp')).css('display')!=='none'){
                        tmpinput.datetimepicker('hide');
                        tmpinput.datetimepicker('show');
                    }
                });

                $(window).resize(function() {
                    if($(tmpinput.data('dtp')).css('display')!=='none'){
                        tmpinput.datetimepicker('hide');
                        tmpinput.datetimepicker('show');
                    }
                });

                i++;
            });

            $('input.dateTime').each(function() {
                $(this).datetimepicker({
                    datepicker:false,
                    format:'H:i',
                    step: 15
                });
            });

        },

        submitButton: function () {
            $('#edit_form_container form:first').on('submit', function () {
                var form = $('#edit_form_container form');
                if (!form.validator('validate').data('bs.validator').hasErrors()) {
                    $.post(form.attr('action'), form.serialize()).done(function (data) {
                        // Si validation serveur OK
                        if (data.res === true) {
                            form.trigger('ajaxdone');
                            // Affiche message ok
                            toastr.success($('#' + data.confirmation_message_id).text());

                            var updateTable = function () {
                                setTimeout(function(){ $('#edit-modal').modal('hide'); }, 200);
                                $('#' + data.type + '_' + data.id).effect("highlight", {color: '#A9E2F3'}, 2500);
                            };
                            if (typeof window.oTable != 'undefined') {
                                window.oTable.ajax.reload(updateTable);

                            } else {
                                $('#main_table').DataTable().ajax.reload(updateTable);
                            }
                            if(data.closeModal === true) {
                                 setTimeout(function(){ $('#edit-modal').modal('hide'); }, 200);
                            }
                        }

                        // Si validation serveur NOK
                        else if (data.res === false) {
                            if(data.confirmation_message_id)
                            {
                                toastr.error($('#' + data.confirmation_message_id).text());
                            }
                            else{
                            // Boucle sur chaque erreurs
                                $.each(data.errors, function (key, value) {
                                    // Si child existe (password), on boucle sur les childs
                                    if ($.isPlainObject(data.errors[key])) {
                                        $.each(data.errors[key], function (childkey, childvalue) {
                                            if($.isPlainObject(childvalue)){
                                                $.each(data.errors[key][childkey], function (childrenkey, childrenvalue) {
                                                    $('#' + data.form_name + '_' + key + '_' + childkey+'_'+childrenkey).parent().addClass("has-error");
                                                    $('#' + data.form_name + '_' + key + '_' + childkey+'_'+childrenkey).parent().find('.help-block').text(childrenvalue);
                                                });
                                            }
                                            else{
                                                $('#' + data.form_name + '_' + key + '_' + childkey).parent().addClass("has-error");
                                                $('#' + data.form_name + '_' + key + '_' + childkey).parent().find('.help-block').text(childvalue);
                                            }
                                        });

                                    } 
                                    else {
                                        $('#' + data.form_name + '_' + key).parent().addClass("has-error");
                                        $('#' + data.form_name + '_' + key).parent().find('.help-block').text(value);
                                    }
                                });
                            }
                        }
                    });
                    return false;
                }
            });
        },

        deleteButton: function () {
            $('#edit-modal button[data-action=delete]').off('click');
            $('#edit-modal button[data-action=delete]').on('click', function () {
                var form = $('#frm-edit');
                var action = form.attr('action').replace("nosuchpage", "delete");
                $.post(action).done(function (data) {
                    $('#main_table').DataTable().ajax.reload(function() {
                        $('#edit-modal').modal('hide');
                    });
                });
            });
        },

        // Déplacement de la listbox "Affiche n elements" à droite du bouton
        modalButton: function() {
            $("#modal-btn").detach().prependTo('#main_table_length');
        },

        modal: function() {
            $('#edit-modal').on('shown.bs.modal', function () {
                $("#edit_form_container form input").parent().find('h4').focus();
            });
        },

        chevron:function(){
            function toggleChevron(e) {
                $(e.target)
                    .prev('.panel-heading')
                    .find("i.indicator")
                    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
            }
            if($('.panel-group').length>0){
                $('.panel-group').each(function(){
                    $(this).on('hidden.bs.collapse', toggleChevron);
                    $(this).on('shown.bs.collapse', toggleChevron);
                });
            }
        },

        form: function () {
            // Initialise la validation client (bootstrap validator)
            $('#edit_form_container form').validator();

            mbs.init.datePicker();
            mbs.init.submitButton();
            mbs.init.deleteButton();
            mbs.init.chevron();
        }
    },

    dataTableRender: {
        date: function (data, type, full, meta) {
            if (!data) return null;
            if (m = data.match(/(\d{4})-(\d{2})-(\d{2})/)) {
                // var dt = new Date(m[1], m[2], m[3]);
                return m[3] + '/' + m[2] + '/' + m[1];
            } else {
                return data;
            }
        }
    },

    loader: {
        load: function(parent,texte) {
            if(texte === undefined) {
                texte = false;
            }
            if (!parent) parent = 'body';
            if(texte){
                $(parent).append('<div id="mbs-loader"><span class="loader-text">'+texte+'</span><span class="loader-quart"></span></div>');
            }
            else{
                $(parent).append('<div id="mbs-loader"><span class="loader-quart"></span></div>');
            }
        },

        unload: function() {
            $('#mbs-loader').remove();
        }
    }
};