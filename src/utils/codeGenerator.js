// src/utils/codeGenerator.js
export const generateCode = (classes, relations, language = 'java') => {
  switch (language.toLowerCase()) {
    case 'php':
      return generatePHPCode(classes, relations);
    case 'java':
      return generateJavaCode(classes, relations);
    case 'python':
      return generatePythonCode(classes, relations);
    default:
      return generateJavaCode(classes, relations);
  }
};

const generateJavaCode = (classes, relations) => {
  let code = '';
  
  classes.forEach(cls => {
    // Find inheritance relation
    const inheritance = relations.find(
      rel => rel.target === cls.id && rel.type === 'generalization'
    );
    
    // Class declaration with inheritance
    code += `public class ${cls.name}`;
    if (inheritance) {
      const parentClass = classes.find(c => c.id === inheritance.source);
      if (parentClass) {
        code += ` extends ${parentClass.name}`;
      }
    }
    code += ' {\n\n';

    // Attributes
    cls.attributes.forEach(attr => {
      code += `    ${attr.access} ${attr.type} ${attr.name};\n`;
    });
    code += '\n';

    // Constructor
    code += `    public ${cls.name}() {\n    }\n\n`;

    // Getters and Setters
    cls.attributes.forEach(attr => {
      // Getter
      code += `    public ${attr.type} get${capitalize(attr.name)}() {\n`;
      code += `        return this.${attr.name};\n`;
      code += `    }\n\n`;

      // Setter
      code += `    public void set${capitalize(attr.name)}(${attr.type} ${attr.name}) {\n`;
      code += `        this.${attr.name} = ${attr.name};\n`;
      code += `    }\n\n`;
    });

    // Methods
    cls.methods.forEach(method => {
      code += `    ${method.access} ${method.returnType} ${method.name}() {\n`;
      code += `        // TODO: Implement method\n`;
      code += `    }\n\n`;
    });

    code += '}\n\n';
  });

  return code;
};

const generatePHPCode = (classes, relations) => {
  let code = "<?php\n\n";
  
  classes.forEach(cls => {
    const inheritance = relations.find(
      rel => rel.target === cls.id && rel.type === 'generalization'
    );
    
    code += `class ${cls.name}`;
    if (inheritance) {
      const parentClass = classes.find(c => c.id === inheritance.source);
      if (parentClass) {
        code += ` extends ${parentClass.name}`;
      }
    }
    code += ' {\n\n';

    // Attributes
    cls.attributes.forEach(attr => {
      const visibility = attr.access === 'package' ? 'public' : attr.access;
      code += `    ${visibility} $${attr.name};\n`;
    });
    code += '\n';

    // Constructor
    code += `    public function __construct() {\n    }\n\n`;

    // Getters and Setters
    cls.attributes.forEach(attr => {
      // Getter
      code += `    public function get${capitalize(attr.name)}() {\n`;
      code += `        return $this->${attr.name};\n`;
      code += `    }\n\n`;

      // Setter
      code += `    public function set${capitalize(attr.name)}($${attr.name}) {\n`;
      code += `        $this->${attr.name} = $${attr.name};\n`;
      code += `    }\n\n`;
    });

    // Methods
    cls.methods.forEach(method => {
      const visibility = method.access === 'package' ? 'public' : method.access;
      code += `    ${visibility} function ${method.name}() {\n`;
      code += `        // TODO: Implement method\n`;
      code += `    }\n\n`;
    });

    code += '}\n\n';
  });

  return code;
};

const generatePythonCode = (classes, relations) => {
  let code = '';
  
  classes.forEach(cls => {
    const inheritance = relations.find(
      rel => rel.target === cls.id && rel.type === 'generalization'
    );
    
    code += `class ${cls.name}`;
    if (inheritance) {
      const parentClass = classes.find(c => c.id === inheritance.source);
      if (parentClass) {
        code += `(${parentClass.name})`;
      }
    }
    code += ':\n';

    // Constructor with attributes
    code += '    def __init__(self):\n';
    if (cls.attributes.length === 0) {
      code += '        pass\n';
    } else {
      cls.attributes.forEach(attr => {
        code += `        self.${attr.name} = None  # ${attr.type}\n`;
      });
    }
    code += '\n';

    // Getters and Setters using @property
    cls.attributes.forEach(attr => {
      // Getter
      code += `    @property\n`;
      code += `    def ${attr.name}(self):\n`;
      code += `        return self._${attr.name}\n\n`;

      // Setter
      code += `    @${attr.name}.setter\n`;
      code += `    def ${attr.name}(self, value):\n`;
      code += `        self._${attr.name} = value\n\n`;
    });

    // Methods
    cls.methods.forEach(method => {
      code += `    def ${method.name}(self):\n`;
      code += `        # TODO: Implement method\n`;
      code += `        pass\n\n`;
    });

    code += '\n';
  });

  return code;
};

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
