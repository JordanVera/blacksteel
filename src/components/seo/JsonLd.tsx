type JsonLdData = Record<string, unknown> | null | undefined;

interface JsonLdProps {
  data: JsonLdData | JsonLdData[];
}

export function JsonLd({ data }: JsonLdProps) {
  const entries = (Array.isArray(data) ? data : [data]).filter(
    (entry): entry is Record<string, unknown> => Boolean(entry)
  );
  if (entries.length === 0) return null;

  return (
    <>
      {entries.map((entry, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
