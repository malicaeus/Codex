import { InfoboxData } from '@/types/wiki';

interface WikiInfoboxProps {
  data: InfoboxData;
}

export function WikiInfobox({ data }: WikiInfoboxProps) {
  return (
    <div className="wiki-infobox animate-fade-in">
      <div className="wiki-infobox-header">{data.title}</div>
      
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="wiki-infobox-image"
        />
      )}
      
      <div className="wiki-infobox-content">
        {data.rows.map((row, index) => (
          <div key={index} className="wiki-infobox-row">
            <div className="wiki-infobox-label">{row.label}</div>
            <div className="wiki-infobox-value">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
