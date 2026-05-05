import cn from 'classnames';
import { ChangeEvent, forwardRef, type JSX } from 'react';
import Typography from '@/components/atoms/Typography';
import { FormInput as FormInputProps } from './types';
import './Input.css';


const Input = forwardRef((props: FormInputProps, ref: any): JSX.Element => {
  const { customChangeBehaviour, error, modShowLabel = true, ...inputProps } = props;
  const inputClassName = cn(
    'input',
    props.required && 'input--required',
    props.disabled && 'input--disabled',
    error && 'input--has-error',
    modShowLabel && 'input--show-label',
  );
  const inputLabelClassNames = cn('input__label', !modShowLabel && 'u-visually-hidden');

  const handleChange = (e: ChangeEvent<HTMLElement>) => {
    if (customChangeBehaviour) {
      customChangeBehaviour(e);
    }

    if (!props.onChange) return;
    props.onChange(e);
  };

  return (
    <div className={inputClassName}>
      <label htmlFor={props.id}>
        <Typography className={inputLabelClassNames}>{props.label}</Typography>
      </label>
      <input className="input__field" {...inputProps} ref={ref} onChange={handleChange} />
      {error && <div className="input__error">{error}</div>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
