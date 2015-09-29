define([
  'summernote/base/core/agent'
], function (agent) {
  var HelpDialog = function (summernote) {
    var self = this;
    var ui = $.summernote.ui;

    var $editor = summernote.layoutInfo.editor;
    var options = summernote.options;
    var lang = options.langInfo;

    this.initialize = function () {
      var $container = options.dialogsInBody ? $(document.body) : $editor;

      var body = [
        '<p class="text-center">',
        '<a href="//summernote.org/" target="_blank">Summernote @VERSION</a> · ',
        '<a href="//github.com/summernote/summernote" target="_blank">Project</a> · ',
        '<a href="//github.com/summernote/summernote/issues" target="_blank">Issues</a>',
        '</p>'
      ].join('');

      this.$dialog = ui.dialog({
        title: lang.options.help,
        body: body
      }).render();

      $container.append(this.$dialog);
    };

    /**
     * show help dialog
     *
     * @return {Promise}
     */
    this.showHelpDialog = function () {
      return $.Deferred(function (deferred) {
        ui.onDialogHidden(self.$dialog, function () {
          deferred.resolve();
        });
        ui.showDialog(self.$dialog);
      }).promise();
    };

    this.show = function () {
      summernote.invoke('editor.saveRange');
      this.showHelpDialog().then(function () {
        summernote.invoke('editor.restoreRange');
      });
    };
  };

  return HelpDialog;
});
