export default function formatTemplateString(template) {
  const placeholderRegex = /\[([^\]]+)\]/g;
  const spinnerRegex = /\{([^}]+)\}/g;

  const formattedTemplate = template
    ?.replace(placeholderRegex, '<span class="placeholder">[$1]</span>')
    ?.replace(spinnerRegex, '<span class="text-spinner">{$1}</span>');

  return formattedTemplate;
}
