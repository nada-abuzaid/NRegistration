import { Input, Select } from 'antd';
import { IFields, IGender } from '../../interfaces';
import { Item } from './Item';
import { handleChange, handleSelect } from './functions';
import { ENDPOINTS } from '../../constants';

export const Inputs = ({
  inputsType,
  isFormDisable,
  selectedCountry,
  setSelectedCountry,
  setCustomerType,
}: any) => {
  return (
    <>
      {inputsType.map(
        ({ id, label, type, name, placeholder, options = [] }: IFields) => {
          const isCitiesInputVisible = name === ENDPOINTS.CITIES && selectedCountry === '';
          if (isCitiesInputVisible) return;
          return (
            <Item name={name} label={label} id={id} key={id} inputsType={inputsType}>
              {type === 'list' ? (
                <Select
                  placeholder={placeholder}
                  disabled={isFormDisable}
                  onChange={(e) => handleSelect(e, name, setSelectedCountry)}
                >
                  {options.map(({ id, label, value }: IGender) => (
                    <Select.Option key={id} value={value}>
                      {label}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input
                  type={type}
                  placeholder={placeholder}
                  disabled={isFormDisable}
                  onChange={(e: any) => handleChange(e, setCustomerType)}
                />
              )}
            </Item>
          );
        }
      )}
    </>
  );
};
