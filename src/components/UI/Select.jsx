import { ChevronDown } from 'lucide-react';

const Select = ({
    options = [],
    value = '',
    onChange,
    placeholder = 'Виберіть опцію',
    disabled = false,
    className = '',
    label = '',
    error = ''
}) => {
    const handleChange = (e) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div className={`relative ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            
            <div className="relative">
                <select
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`
                        w-full px-3 py-2 pr-10 text-sm border rounded-lg 
                        bg-white appearance-none cursor-pointer
                        focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                        disabled:bg-gray-100 disabled:cursor-not-allowed
                        ${error ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'}
                        transition-all duration-200
                    `}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {options.map((option) => (
                        <option 
                            key={typeof option === 'object' ? option.value : option} 
                            value={typeof option === 'object' ? option.value : option}
                        >
                            {typeof option === 'object' ? option.label : option}
                        </option>
                    ))}
                </select>

                {/* Custom dropdown arrow */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            {error && (
                <p className="mt-1 text-xs text-red-500">{error}</p>
            )}
        </div>
    );
};

export default Select;