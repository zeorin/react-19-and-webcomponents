{ pkgs, lib, config, inputs, ... }:

{
  languages.javascript.enable = true;
  languages.javascript.corepack.enable = true;
  languages.typescript.enable = true;
}
