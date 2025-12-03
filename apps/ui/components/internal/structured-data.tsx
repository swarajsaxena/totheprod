type Schema = {
  "@context": string
  "@type": string
  [key: string]: unknown
}

type Props = {
  data: Schema | Schema[]
}

export const StructuredData = ({ data }: Props) => {
  const schemas = Array.isArray(data) ? data : [data]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this for proper SEO
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
          key={index}
          type="application/ld+json"
        />
      ))}
    </>
  )
}
