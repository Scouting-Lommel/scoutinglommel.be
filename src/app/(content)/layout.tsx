import BreadcrumbJsonLd from '@/components/atoms/BreadcrumbJsonLd';

const ContentLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <BreadcrumbJsonLd />
    {children}
  </>
);

export default ContentLayout;
