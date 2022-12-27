/*
 * selectClassNames.ts
 * author: evan kirkiles
 * created on Mon Dec 26 2022
 * 2022 the nobot space, 
 */
import s from "../styles/select.module.scss";

const selectClassNames = {
  container: () => s.select_container,
  control: () => s.select_control,
  input: () => s.select_input,
  menu: () => s.select_menu,
  dropdownIndicator: () => s.select_indicator_container,
  indicatorSeparator: () => s.select_indicator_separator,
  clearIndicator: () => s.select_indicator_container,
  loadingIndicator: () => s.select_indicator_container,
  option: ({ isFocused }: { isFocused: boolean }) =>
    isFocused ? s.select_option_focused : s.select_option,
  multiValue: () => s.select_option_multivalue,
}

export default selectClassNames;