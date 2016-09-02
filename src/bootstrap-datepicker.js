angular.module('schemaForm').config(
    ['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider', 'sfBuilderProvider',
      function(schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider, sfBuilderProvider) {

        var datepicker = function(name, schema, options) {
          if (schema.type === 'string' && (schema.format === 'date' || schema.format === 'date-time')) {
            var f = schemaFormProvider.stdFormObj(name, schema, options);
            f.key = options.path;
            f.type = 'datepicker';
            options.lookup[sfPathProvider.stringify(options.path)] = f;
            return f;
          }
        };

        schemaFormProvider.defaults.string.unshift(datepicker);

        var ngModelOptions = sfBuilderProvider.builders.ngModelOptions;
        var ngModel = sfBuilderProvider.builders.ngModel;
        var sfField = sfBuilderProvider.builders.sfField;
        var condition = sfBuilderProvider.builders.condition;
        var defaults = [sfField, ngModel, ngModelOptions, condition];

        //Add to the bootstrap directive
        schemaFormDecoratorsProvider.defineAddOn(
            'bootstrapDecorator',
            'datepicker',
            'directives/decorators/bootstrap/datepicker/datepicker.html',
            defaults
        );
      }
    ]);
