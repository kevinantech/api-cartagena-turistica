import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export type JWTConfig = (params: {
  expiresIn?: string;
}) => JwtModuleAsyncOptions;

/**
 * Configuracion para JwtModule con registerAsync, permitiendo la carga de variables de entorno.
 * @param expiresIn 1hr por defecto.
 * @returns
 */
export const JwtConfig: JWTConfig = ({ expiresIn = '1hr' }) => ({
  useFactory: () => ({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn },
  }),
});
