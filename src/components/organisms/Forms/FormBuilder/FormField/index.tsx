import cn from 'classnames';
import type { JSX } from 'react';
import Divider from '@/components/atoms/Divider';
import Captcha from '@/components/atoms/Forms/Captcha';
import Checkbox from '@/components/atoms/Forms/Checkbox';
import File from '@/components/atoms/Forms/File';
import Input from '@/components/atoms/Forms/Input';
import RadioGroup from '@/components/atoms/Forms/RadioGroup';
import Select from '@/components/atoms/Forms/Select';
import TextArea from '@/components/atoms/Forms/TextArea';
import Typography from '@/components/atoms/Typography';
import { FormField as FormFieldProps } from './types';
import './FormField.css';


const FormField = (props: FormFieldProps): JSX.Element => {
  const errorMessage = props.errors && props.name ? props.errors[props.name]?.message : undefined;

  switch (props.type) {
    case 'text': {
      return (
        <div className={cn('form-field', props.className)}>
          <Typography data={props.text} />
        </div>
      );
    }
    case 'divider': {
      return (
        <div className="form-field">
          <div className="form-field__divider">
            <Divider />
          </div>
        </div>
      );
    }
    case 'row': {
      return (
        <div className="form-field">
          {props.fieldChildren?.map((child) => {
            return (
              <FormField
                key={child.id}
                register={props.register}
                errors={props.errors}
                {...child}
              />
            );
          })}
        </div>
      );
    }
    case 'input': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="input"
              id={props.id}
              {...props.register(props.name)}
              value={props.value}
              placeholder={props.placeholder}
              required={props.required}
              disabled={props.disabled}
              autoComplete={props.autoComplete}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'number': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="number"
              id={props.id}
              {...props.register(props.name)}
              value={props.value}
              placeholder={props.placeholder}
              required={props.required}
              disabled={props.disabled}
              autoComplete={props.autoComplete}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'email': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="email"
              id={props.id}
              {...props.register(props.name)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'tel': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="tel"
              id={props.id}
              {...props.register(props.name)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'date': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="date"
              id={props.id}
              {...props.register(props.name)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              customChangeBehaviour={props.customChangeBehaviour}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'url': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="url"
              id={props.id}
              {...props.register(props.name)}
              pattern={String(props.pattern)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              customChangeBehaviour={props.customChangeBehaviour}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'file': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <File
              label={props.label!}
              type="file"
              id={props.id}
              {...props.register(props.name)}
              required={props.required}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'datetime': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Input
              label={props.label!}
              type="datetime-local"
              id={props.id}
              {...props.register(props.name)}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              customChangeBehaviour={props.customChangeBehaviour}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'textarea': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <TextArea
              label={props.label!}
              id={props.id}
              {...props.register(props.name)}
              rows={props.rows}
              placeholder={props.placeholder}
              required={props.required}
              autoComplete={props.autoComplete}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'select': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Select
              label={props.label!}
              id={props.id}
              {...props.register(props.name!)}
              options={props.options || []}
              required={props.required}
              autoComplete={props.autoComplete}
              customChangeBehaviour={props.customChangeBehaviour}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'radioGroup': {
      return (
        <div className="form-field">
          <RadioGroup
            id={props.id}
            label={props.label!}
            name={props.name}
            value={props.value}
            direction={props.direction}
            radioButtons={props.radioButtons}
            required={props.required}
            register={props.register}
            error={errorMessage}
          />
        </div>
      );
    }
    case 'checkbox': {
      return (
        <div className="form-field">
          {props.register && props.name && (
            <Checkbox
              id={props.id}
              {...props.register(props.name!)}
              label={props.label!}
              required={props.required}
              autoComplete={props.autoComplete}
              checked={props.defaultChecked}
              customChangeBehaviour={props.customChangeBehaviour}
              error={errorMessage}
            />
          )}
        </div>
      );
    }
    case 'captcha': {
      return (
        <div className="form-field">
          <Captcha />
        </div>
      );
    }
    case 'hidden': {
      return (
        <>
          {props.register && props.name && (
            <input id={props.id} name={props.name} type="hidden" value={props.value} />
          )}
        </>
      );
    }
  }
};

export default FormField;
