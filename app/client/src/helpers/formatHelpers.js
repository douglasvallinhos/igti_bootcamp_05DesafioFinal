const formatter = Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatNumber(value) {
  if (!value) {
    return 0;
  } else {
    return formatter.format(value);
  }
}

export { formatNumber };
