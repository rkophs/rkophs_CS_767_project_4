/*
* @Author: ryan
* @Date:   2016-11-25 19:50:28
* @Last Modified by:   Ryan Kophs
* @Last Modified time: 2016-11-27 21:59:43
*/

'use strict';

/* Thermodynamic potential (V)
 * Inputs:
 *	- T: Temperature (K)
 *	- p_H2: Partial pressure of hydrogen (atm)
 *	- p_O2: Partial pressure of oxygen (atm)
 */
const E_nerst = (T, p_H2, p_O2) => {
	return 1.229 - 0.00085*(T - 298.15) 
		+ 0.000043085*T*Math.log(p_H2*Math.sqrt(p_O2));
};

/* Partial pressure of hydrogen (atm)
 * Inputs:
 *	- R_ha: Relative humidity in anode
 *  - p_H2O_sat: Saturation pressure of H2O (atm)
 *	- p_a: anode inlet pressure (atm)
 *	- i_den: current density (A/(cm^2))
 *	- T: Temperature (K)
 */
const p_H2 = (R_Ha, p_H2O_sat, p_a, i_den, T) => {
	const R_Ha_p_H2O_sat = R_Ha*p_H2O_sat;
	const exp = Math.exp((1.635*(i_den))/Math.pow(T, 1.334));
	return 0.5*R_Ha_p_H2O_sat*((p_a/(exp*R_Ha_p_H2O_sat)) -1);
};

/* Partial pressure of oxygen (atm)
 * Inputs:
 *	- R_hc: Relative humidity in cathode
 *  - p_H2O_sat: Saturation pressure of H2O (atm)
 *	- p_c: cathode inlet pressure (atm)
 *	- i_den: current density (A/(cm^2))
 *	- T: Temperature (K)
 */
const p_O2 = (R_Hc, p_H2O_sat, p_c, i_den, T) => {
	const R_Hc_p_H2O_sat = R_Hc*p_H2O_sat;
	const exp = Math.exp((4.192*(i_den))/Math.pow(T, 1.334));
	return R_Hc_p_H2O_sat*((p_c/(exp*R_Hc_p_H2O_sat)) -1);
};


/* Saturation pressure of H2O (atm)
 * Inputs:
 *	- T: Temperature (K)
 */
const p_H2O_sat = (T) => {
	const T_n = T - 273.15;
	const T_n_sq = T_n*T_n;
	const T_n_cu = T_n_sq*T_n;
	const x = 0.0295*T_n - 0.0000919*T_n_sq + 0.000000144*T_n_cu - 2.18;
	return Math.pow(10, x);
};

/* Activation loss (V)
 * Inputs: 
 *	- x1, x2, x3, x4: parametric coefficients
 *	- T: Temperature (K)
 *	- c_O2: CO2 (atm/K)
 *	- i: current (A)
 */
const n_act = (x1, x2, x3, x4, T, c_O2, i) => {
	return -x1 - T*(x2 + x3*Math.log(c_O2) + x4*Math.log(i));
};

/* c_O2: CO2 (atm/K)
 * Inputs: 
 *	- p_O2: Partial pressure of oxygen (atm)
 *	- T: Temperature (K)
 */
const c_O2 = (p_O2, T) => {
	return p_O2 / (5080000*Math.exp(-498/T));
};

/* Concentration loss (V)
 * Inputs:
 *	- B: parametric coefficient (V)
 *	- i_den: current density (A/(cm^2))
 *	- i_limit_den: limiting current density (A/(cm^2))
 */
const n_conc = (B, i_den, i_limit_den) => {
	return -1*B*Math.log(1-(i_den / i_limit_den));
};

/* Current density (A/(cm^2))
 * Inputs:
 *	- i: current (A)
 *	- A: membrane area (cm^2)
 */
const i_den = (i, A) => {
	return i/A;
};

/* Ohmic loss (V)
 * Inputs:
 *	- i: current (A)
 *	- R_c: resistence of proton transfer (ohm)
 *	- R_m: membrane resistence (ohm)
 */
const n_ohm = (i, R_c, R_m) => {
	return i*(R_c + R_m);
};

/* Membrane resistence (ohm)
 * Inputs:
 *	- p_m: membrane resistivity for electron flow
 *	- l: membrane thickness (cm)
 *	- A: area (cm^2)
 */
const R_m = (p_m, l, A) => {
	return p_m*l / A;
};

/* Membrane resistivity for electron flow
 * Inputs:
 *	- i_den: current density (A/(cm^2))
 *	- T: temperature (K)
 *	- y: parameter of the cell
 */
const p_m = (i_den, T, y) => {
	const exp = Math.exp(4.18*((T-303)/T));
	const numer = 181.6 + 5.448*i_den + 11.2592*(T/303)*Math.pow(i_den, 2.5);
	const denom = (y - 0.634 - 3*i_den)*exp;
	return numer / denom;
};

/* Voltage of the cell (V)
 * Inputs:
 *	- E_nerst: Thermodynamic potential (V)
 *	- n_act: Activation loss (V)
 *	- n_ohm: Ohmic loss (V)
 *	- n_conc: Concentration loss (V)
 */
const V_cell = (E_nerst, n_act, n_ohm, n_conc) => {
	return E_nerst - n_act - n_ohm - n_conc;
};

/* Voltage of a stack (V)
 * Inputs:
 *	- N_s: Number of cells
 *	- V_cell: Voltage of the cell (V)
 */
const V_stack = (N_s, V_cell) => {
	return N_s*V_cell;
};

const fuelCellBuilder = (N_s, A, l, i_limit_den, R_Ha, R_Hc, T, p_a, p_c) => 
	(i, x1, x2, x3, x4, y, R_c, b) => {

		const _i_den = i_den(i, A);
		const _p_H2O_sat = p_H2O_sat(T);
		const _p_H2 = p_H2(R_Ha, _p_H2O_sat, p_a, _i_den, T);
		const _p_O2 = p_O2(R_Hc, _p_H2O_sat, p_c, _i_den, T);
		const _E_nerst = E_nerst(T, _p_H2, _p_O2);
		const _c_O2 = c_O2(_p_O2, T);
		const _n_act = n_act(x1, x2, x3, x4, T, _c_O2, i);
		const _p_m = p_m(_i_den, T, y);
		const _R_m = R_m(_p_m, l, A);
		const _n_ohm = n_ohm(i, R_c, _R_m);
		const _n_conc = n_conc(b, _i_den, i_limit_den)
		const _V_cell = V_cell(_E_nerst, _n_act, _n_ohm, _n_conc);
		const _V_stack = V_stack(N_s, _V_cell);
		return _V_stack;
	};

export default fuelCellBuilder
