function createRegister(defaultValue = null) {
  return {
    current: defaultValue,
    set(value) {
      this.current = value;
    },
  };
}
