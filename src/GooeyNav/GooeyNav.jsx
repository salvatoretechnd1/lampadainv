/**
 * GooeyNav — versão simples, sem efeitos de partículas/blur.
 * Apenas ícone + label mudando de cor quando a aba fica ativa.
 *
 * items: [{ id, label, icone: ComponenteIcone, badge?: boolean }]
 * activeId: id da aba ativa (controlado pelo pai)
 * onChange: (id) => void, chamado ao clicar numa aba
 * colors: { active, muted, badge } — cores do tema (hex)
 */
const GooeyNav = ({
  items,
  activeId,
  onChange,
  colors = {}
}) => {
  const activeIndex = Math.max(0, items.findIndex((it) => it.id === activeId));

  const {
    active = '#E3B23C',
    muted = '#9AA3C7',
    badge = '#C1666B'
  } = colors;

  const handleClick = (e, id) => {
    e.preventDefault();
    if (onChange) onChange(id);
  };

  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onChange) onChange(id);
    }
  };

  return (
    <div
      className="gooey-nav-container"
      style={{
        '--gooey-active': active,
        '--gooey-muted': muted,
        '--gooey-badge': badge
      }}
    >
      <nav>
        <ul>
          {items.map((item, index) => {
            const Icone = item.icone;
            const ativa = activeIndex === index;
            return (
              <li key={item.id} className={ativa ? 'active' : ''}>
                <a
                  href="#"
                  onClick={(e) => handleClick(e, item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                >
                  <span className="gooey-nav-icon-wrap">
                    {Icone && <Icone size={18} strokeWidth={ativa ? 2.4 : 1.9} />}
                    {item.badge && <span className="gooey-nav-badge" />}
                  </span>
                  <span className="gooey-nav-label">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default GooeyNav;
