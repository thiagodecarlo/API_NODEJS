export class MockHelper {
  public getCrop() {
    return {
      id: '3fc53545-00e0-480c-a231-fccc3e4e3cb9',
      name: 'string',
      active: true,
    };
  }

  public getAllCrops() {
    return new Array(this.getCrop());
  }

  public getFarm() {
    return {
      id: 'ce354e26-9970-48b5-9300-32340818f563',
      name: 'string',
      document: '12312312323',
      propertyName: 'Fazenda Santa Fé',
      city: 'Presidente Prudente',
      state: 'São Paulo',
      totalArea: 1200,
      arableArea: 1000,
      vegetationArea: 200,
      active: true,
      cropsIds: ['df354e26-99970-48b5-9230-32383818f527'],
    };
  }

  public getAllFarms(): any[] {
    return new Array(this.getFarm());
  }
}
