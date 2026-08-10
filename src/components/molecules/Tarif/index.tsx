import type { JSX } from 'react';
import { formatPrice } from '@/lib/helpers/formatPrice';
import Typography from '@/components/atoms/Typography';
import { Tarif as TarifProps } from './types';
import './Tarif.css';

const Tarif = ({ name, dayPrice, minimumPrice, example }: TarifProps): JSX.Element => {
  return (
    <details className="tarif">
      <summary className="tarif__data">
        <Typography className="tarif__name" tagName="h3">
          {name}
        </Typography>
        <Typography className="tarif__min" modNoStyle>
          {formatPrice(minimumPrice)}
        </Typography>
        <Typography className="tarif__day" modNoStyle>
          {formatPrice(dayPrice)}
        </Typography>
        <div className="tarif__example">voorbeeld -&gt;</div>
      </summary>
      <Typography data={example} className="tarif__example__content" />
    </details>
  );
};

export default Tarif;
