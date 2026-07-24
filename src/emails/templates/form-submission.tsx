import {
  Body,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import {
  emailRegExValidation,
  phoneRegExValidation,
  urlRegExValidation,
} from '@/lib/constants/regexValidation';

interface FormSubmissionEmailProps {
  formTitle: string;
  formData: { label: string; data: unknown }[];
}

export const FormSubmissionEmail = ({ formTitle, formData }: FormSubmissionEmailProps) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Montserrat"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Nunito Sans"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>

      <Body style={body}>
        <Preview>Nieuwe inzending: {formTitle}</Preview>
        <Container style={container}>
          <Section>
            <Section style={header}>
              <Heading style={{ ...heading, ...h1 }}>Formulierinvoer</Heading>
              <Text style={text}>
                Nieuwe inzending van:{' '}
                <strong style={{ textTransform: 'lowercase' }}>{formTitle}</strong>.
              </Text>
              <Text style={text}>
                Tijdstip van inzending:{' '}
                <strong>
                  {new Date().toLocaleDateString('nl-BE', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  , {new Date().toLocaleTimeString('nl-BE', { hour: '2-digit', minute: '2-digit' })}
                </strong>
                .
              </Text>
            </Section>
            <Hr style={hr} />
            {formData.map((dataPoint) => {
              const tableData = String(dataPoint.data);

              return (
                <Section style={formDataSection} key={dataPoint.label}>
                  <Heading as="h2" style={{ ...heading, ...h2 }}>
                    {dataPoint.label}
                  </Heading>
                  {(() => {
                    if (phoneRegExValidation.test(tableData)) {
                      return (
                        <Link style={{ ...text, ...link, ...dataText }} href={`tel:${tableData}`}>
                          {tableData}
                        </Link>
                      );
                    }
                    if (emailRegExValidation.test(tableData)) {
                      return (
                        <Link
                          style={{ ...text, ...link, ...dataText }}
                          href={`mailto:${tableData}`}
                        >
                          {tableData}
                        </Link>
                      );
                    }
                    if (urlRegExValidation.test(tableData)) {
                      return (
                        <Link style={{ ...text, ...link, ...dataText }} href={tableData}>
                          {tableData}
                        </Link>
                      );
                    }
                    return (
                      <div style={text}>
                        <pre style={dataText}>{tableData}</pre>
                      </div>
                    );
                  })()}
                </Section>
              );
            })}

            <Hr style={hr} />
          </Section>
          <Section>
            <Text style={footer}>
              &copy;{' '}
              <Link href="https://scoutinglommel.be" style={link}>
                Scouting Sint-Pieter Lommel
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const body = {
  fontSize: '16px',
  padding: '0.5rem 0',
};
const container = {
  boxShadow: '0 0 0.875rem 0 rgba(0, 0, 0, 0.1)',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  margin: 'auto auto',
};
const header = {
  marginTop: '1.75rem',
};
const hr = {
  marginTop: '1.75rem',
  marginBottom: '1.5rem',
};
const heading = {
  marginTop: '0',
  marginBottom: '0.5rem',
  fontFamily: 'Montserrat, sans-serif',
};
const h1 = {
  fontSize: '1.75rem',
  marginBottom: '0.75rem',
};
const h2 = {
  fontSize: '1rem',
  marginBottom: '0.25rem',
};
const text = {
  fontSize: '1rem',
  margin: '0',
};
const formDataSection = {
  marginBottom: '1.5rem',
};
const dataText = {
  fontSize: '0.875rem',
  whiteSpace: 'pre-wrap',
  margin: '0.5rem 0',
  display: 'inline-block',
  color: '#555',
};
const link = {
  color: '#666',
  textDecoration: 'underline',
};
const footer = {
  color: '#555',
  fontSize: '0.875rem',
  marginTop: 0,
  marginBottom: '1.5rem',
  textAlign: 'center' as const,
};

FormSubmissionEmail.PreviewProps = {
  formTitle: 'Contactformulier',
  formData: [
    { label: 'Voornaam', data: 'Sam' },
    { label: 'Familienaam', data: 'Peeters' },
    { label: 'Email', data: 'sam.peeters@example.com' },
    { label: 'Telefoon', data: '+32470123456' },
    {
      label: 'Bericht',
      data: 'Beste,\n\nIk heb onlangs jullie website bezocht en had een vraag over de beschikbaarheid van jullie lokalen.\n\nConcreet:\n* Wij zijn een groep van 32 personen.\n* We hebben interesse in de tentenweide.\n* Gebruik van het sanitair indien mogelijk.\n* 17 tot 28 juli 2026.\n\nKunnen jullie mij laten weten:\n* Wat de kostprijs zal bedragen\n* Of de mogelijkheid bestaat om vroeger aan te komen en later te vertrekken\n* Of er extra kosten aan verbonden zijn\n\nExtra info:\n* Onze groep: Chiro Alken\n* Voorkeurcontact: e-mail\n\nAlvast bedankt voor jullie reactie.\n\nMet vriendelijke groet,\n\nSam Peeters\nWelpenleiding\nsam.peeters@example.com\n+32470123456',
    },
  ],
} as FormSubmissionEmailProps;

export default FormSubmissionEmail;
